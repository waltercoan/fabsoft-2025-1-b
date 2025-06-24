package br.univille.projfabsoft.service.impl;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import br.univille.projfabsoft.entity.Carro;
import br.univille.projfabsoft.repository.CarroRepository;
import br.univille.projfabsoft.service.CarroService;

@Service
public class CarroServiceImpl implements CarroService{
    
    @Autowired
    private CarroRepository repository;
    
    @Value("${fabrica2025.tempfolder}")
    private String tempFolder;
    private Path root = null;
    
    @Override
    public Carro save(Carro carro) {
        saveFoto(carro);
        repository.save(carro);
        return carro;
    }

    @Override
    public List<Carro> getAll() {
        var listaCarros = repository.findAll();
        listaCarros.stream()
            .filter(carro -> carro.getArquivoFoto() != null && !carro.getArquivoFoto().isEmpty())
            .forEach(this::carregaFoto);
        return repository.findAll();
    }

    @Override
    public Carro getById(Long id) {
        var retorno = repository.findById(id);
        if(retorno.isPresent()){
            var umCarro = retorno.get();
            carregaFoto(umCarro);
            return umCarro;
        }
        return null;
    }

    @Override
    public Carro delete(Long id) {
        var cliente = getById(id);
        if(cliente != null)
            repository.deleteById(id);
        return cliente;
    }

    private void saveFoto(Carro carro){

        if(carro.getFoto() == null || carro.getFoto().equals("")){
            return;
        }

        if (!carro.getMimeType().startsWith("image/")) {
            return;
        }

        byte[] imageBytes = Base64.getDecoder().decode(carro.getFoto());
        InputStream imageStream = new ByteArrayInputStream(imageBytes);

        File dir = new File(tempFolder);
        if (! dir.exists()){
            dir.mkdir();
        }

        root = Paths.get(tempFolder);
        UUID uuid = UUID.randomUUID();
        String novoNome = String.format("%s.%s", uuid.toString(), carro.getArquivoFoto().split("\\.")[1]);
        Path nomeArquivo = this.root.resolve(novoNome);
        try {
            Files.copy(imageStream, nomeArquivo);
        } catch (Exception e) {
            throw new RuntimeException("Não foi possível salvar o arquivo. Error: " + e.getMessage());
        }
        carro.setArquivoFoto(nomeArquivo.toAbsolutePath().toString());
    }

    private Carro carregaFoto(Carro carro){
        if(carro.getArquivoFoto() == null || carro.getArquivoFoto().equals("")){
            return carro;
        }

        File file = new File(carro.getArquivoFoto());
        if(!file.exists()){
            return carro;
        }

        try {
            byte[] imageBytes = Files.readAllBytes(file.toPath());
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
            carro.setFoto(base64Image);
        } catch (Exception e) {
            throw new RuntimeException("Não foi possível carregar a foto. Error: " + e.getMessage());
        }
        
        return carro;
    }

}

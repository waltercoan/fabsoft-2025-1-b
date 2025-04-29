package br.univille.projfabsoft.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.projfabsoft.entity.Carro;
import br.univille.projfabsoft.repository.CarroRepository;
import br.univille.projfabsoft.service.CarroService;

@Service
public class CarroServiceImpl implements CarroService{
    
    @Autowired
    private CarroRepository repository;
    
    @Override
    public Carro save(Carro carro) {
        repository.save(carro);
        return carro;
    }

    @Override
    public List<Carro> getAll() {
        return repository.findAll();
    }

    @Override
    public Carro getById(Long id) {
        var retorno = repository.findById(id);
        if(retorno.isPresent())
            return retorno.get();
        return null;
    }

    @Override
    public Carro delete(Long id) {
        var cliente = getById(id);
        if(cliente != null)
            repository.deleteById(id);
        return cliente;
    }

}

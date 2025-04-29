package br.univille.projfabsoft.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import br.univille.projfabsoft.entity.Carro;
import br.univille.projfabsoft.service.CarroService;

@Controller
@RequestMapping("/api/v1/carros")
public class CarroController {

    @Autowired
    private CarroService service;

    @GetMapping
    public ResponseEntity<List<Carro>> getCarros(){
        var listaCarros = service.getAll();

        return new ResponseEntity<List<Carro>>(listaCarros, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Carro> postCarro(@RequestBody Carro Carro){
        if(Carro == null){
            return ResponseEntity.badRequest().build();
        }
        if(Carro.getId() == 0){
            service.save(Carro);
            return new ResponseEntity<Carro>(Carro, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Carro> 
        putCarro(@PathVariable long id,
            @RequestBody Carro carro){
        
        if(id <= 0 || carro == null){
            return ResponseEntity.badRequest().build();
        }
        var carroAntigo = service.getById(id);
        if(carroAntigo == null){
            return ResponseEntity.notFound().build();
        }
        carroAntigo.setCliente(carro.getCliente());
        carroAntigo.setMarca(carro.getMarca());
        carroAntigo.setModelo(carro.getModelo());
        carroAntigo.setPlaca(carro.getPlaca());

        service.save(carroAntigo);
        return new ResponseEntity<Carro>(carroAntigo,
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Carro> deleteCarro(@PathVariable long id){
        if(id <=0){
            return ResponseEntity.badRequest().build();
        }

        var CarroExcluido = service.getById(id);
        if(CarroExcluido == null){
            return ResponseEntity.notFound().build();
        }
        service.delete(id);

        return new ResponseEntity<Carro>(CarroExcluido,
                HttpStatus.OK);
    }
}

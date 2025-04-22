package br.univille.projfabsoft.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univille.projfabsoft.entity.Cliente;
import br.univille.projfabsoft.service.ClienteService;

@RestController
@RequestMapping("/api/v1/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @GetMapping
    public ResponseEntity<List<Cliente>> getClientes(){
        var listaClientes = service.getAll();

        return new ResponseEntity<List<Cliente>>(listaClientes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Cliente> postCliente(@RequestBody Cliente cliente){
        if(cliente == null){
            return ResponseEntity.badRequest().build();
        }
        if(cliente.getId() == 0){
            service.save(cliente);
            return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> 
        putCliente(@PathVariable long id,
            @RequestBody Cliente cliente){
        
        if(id <= 0 || cliente == null){
            return ResponseEntity.badRequest().build();
        }
        var clienteAntigo = service.getById(id);
        if(clienteAntigo == null){
            return ResponseEntity.notFound().build();
        }
        clienteAntigo.setNome(cliente.getNome());
        clienteAntigo.setEndereco(cliente.getEndereco());
        clienteAntigo.setTelefone(cliente.getTelefone());
        clienteAntigo.setEmail(cliente.getEmail());
        clienteAntigo.setDataNascimento(cliente.getDataNascimento());

        service.save(clienteAntigo);
        return new ResponseEntity<Cliente>(clienteAntigo,
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Cliente> deleteCliente(@PathVariable long id){
        if(id <=0){
            return ResponseEntity.badRequest().build();
        }

        var clienteExcluido = service.getById(id);
        if(clienteExcluido == null){
            return ResponseEntity.notFound().build();
        }
        service.delete(id);

        return new ResponseEntity<Cliente>(clienteExcluido,
                HttpStatus.OK);
    }




}

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

import br.univille.projfabsoft.entity.Revisao;
import br.univille.projfabsoft.service.RevisaoService;

@Controller
@RequestMapping("/api/v1/revisoes")
public class RevisaoController {
    @Autowired
    private RevisaoService service;

    @GetMapping
    public ResponseEntity<List<Revisao>> getRevisoes(){
        var listaRevisoes = service.getAll();

        return new ResponseEntity<List<Revisao>>(listaRevisoes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Revisao> postRevisao(@RequestBody Revisao revisao){
        if(revisao == null){
            return ResponseEntity.badRequest().build();
        }
        if(revisao.getId() == 0){
            service.save(revisao);
            return new ResponseEntity<Revisao>(revisao, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Revisao> 
        putRevisao(@PathVariable long id,
            @RequestBody Revisao revisao){
        
        if(id <= 0 || revisao == null){
            return ResponseEntity.badRequest().build();
        }
        var revisaoAntiga = service.getById(id);
        if(revisaoAntiga == null){
            return ResponseEntity.notFound().build();
        }
        revisaoAntiga.setCarro(revisao.getCarro());
        revisaoAntiga.setCliente(revisao.getCliente());
        revisaoAntiga.setDataEntrada(revisao.getDataEntrada());
        revisaoAntiga.setDataSaida(revisao.getDataSaida());
        revisaoAntiga.setPecasTrocadas(revisao.getPecasTrocadas());
        revisaoAntiga.setServicosRealizados(revisao.getServicosRealizados());
        revisaoAntiga.setValor(revisao.getValor());


        service.save(revisaoAntiga);
        return new ResponseEntity<Revisao>(revisaoAntiga,
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Revisao> deleteRevisao(@PathVariable long id){
        if(id <=0){
            return ResponseEntity.badRequest().build();
        }

        var revisaoExcluida = service.getById(id);
        if(revisaoExcluida == null){
            return ResponseEntity.notFound().build();
        }
        service.delete(id);

        return new ResponseEntity<Revisao>(revisaoExcluida,
                HttpStatus.OK);
    }
}

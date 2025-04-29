package br.univille.projfabsoft.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.projfabsoft.entity.Revisao;
import br.univille.projfabsoft.repository.RevisaoRepository;
import br.univille.projfabsoft.service.RevisaoService;

@Service
public class RevisaoServiceImpl implements RevisaoService{

    @Autowired
    private RevisaoRepository repository;

    @Override
    public Revisao save(Revisao revisao) {
        return repository.save(revisao);
    }

    @Override
    public List<Revisao> getAll() {
        return repository.findAll();
    }

    @Override
    public Revisao getById(Long id) {
        var retorno = repository.findById(id);
        if(retorno.isPresent())
            return retorno.get();
        return null;
    }

    @Override
    public Revisao delete(Long id) {
        var cliente = getById(id);
        if(cliente != null)
            repository.deleteById(id);
        return cliente;
    }

}

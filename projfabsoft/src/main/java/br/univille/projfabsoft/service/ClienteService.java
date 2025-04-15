package br.univille.projfabsoft.service;

import java.util.List;

import br.univille.projfabsoft.entity.Cliente;

public interface ClienteService {
    Cliente save(Cliente cliente);
    List<Cliente> getAll();
    Cliente getById(Long id);
    Cliente delete(Long id);
    
}

package br.univille.projfabsoft.service;

import java.util.List;

import br.univille.projfabsoft.entity.Carro;

public interface CarroService {
    Carro save(Carro carro);
    List<Carro> getAll();
    Carro getById(Long id);
    Carro delete(Long id);
}

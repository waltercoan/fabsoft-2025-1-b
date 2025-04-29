package br.univille.projfabsoft.service;

import java.util.List;

import br.univille.projfabsoft.entity.Revisao;

public interface RevisaoService {
    Revisao save(Revisao revisao);
    List<Revisao> getAll();
    Revisao getById(Long id);
    Revisao delete(Long id);
}

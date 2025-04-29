package br.univille.projfabsoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.projfabsoft.entity.Revisao;

@Repository
public interface RevisaoRepository extends JpaRepository<Revisao,Long>{

}

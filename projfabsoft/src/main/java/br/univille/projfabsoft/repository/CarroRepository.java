package br.univille.projfabsoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.projfabsoft.entity.Carro;

@Repository
public interface CarroRepository extends JpaRepository<Carro,Long>{

}

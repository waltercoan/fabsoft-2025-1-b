package br.univille.projfabsoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.projfabsoft.entity.Cliente;

@Repository
public interface ClienteRepository  
    extends JpaRepository<Cliente,Long> {
    
}

package br.univille.projfabsoft.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Revisao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Cliente cliente;
    @ManyToOne
    private Carro carro;
    private String dataEntrada;
    private String dataSaida;
    private Double valor;
    @OneToMany
    @JoinColumn(name = "id_revisao")
    private List<Peca> pecasTrocadas = new ArrayList<>();
    @OneToMany
    @JoinColumn(name = "id_revisao")
    private List<Servico> servicosRealizados = new ArrayList<>();

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Carro getCarro() {
        return carro;
    }

    public void setCarro(Carro carro) {
        this.carro = carro;
    }

    public String getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(String dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public String getDataSaida() {
        return dataSaida;
    }

    public void setDataSaida(String dataSaida) {
        this.dataSaida = dataSaida;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public List<Peca> getPecasTrocadas() {
        return pecasTrocadas;
    }

    public void setPecasTrocadas(List<Peca> pecasTrocadas) {
        this.pecasTrocadas = pecasTrocadas;
    }

    public List<Servico> getServicosRealizados() {
        return servicosRealizados;
    }

    public void setServicosRealizados(List<Servico> servicosRealizados) {
        this.servicosRealizados = servicosRealizados;
    }
}
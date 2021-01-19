package com.a302.webcuration.domain.Account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor  @Builder
public class Account {

    @Column(name = "account_id")
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


}

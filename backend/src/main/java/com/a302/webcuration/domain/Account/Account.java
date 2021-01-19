package com.a302.webcuration.domain.Account;

import com.a302.webcuration.domain.Tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class Account {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long accountId;
    private String accountNickname;

    private String accountEmail;
    private String accountName;
    private Long accountAuthNum;
    @CreationTimestamp
    private LocalDate accountCreateDate;
    @UpdateTimestamp
    private LocalDate accountUpdateDate;
    private Boolean accountAuthFlag;
//    @ManyToMany
//    @Builder.Default
//    private List<Account> accountFollowing=new ArrayList<>();
//    @ManyToMany(mappedBy = "following")
//    @Builder.Default
//    private List<Account> accountFollower=new ArrayList<>();
    //private List<Tag> tags;
//    @Builder
//    public Account(String accountNickname,String accountEmail,String accountName,Long accountAuthNum){
//        this.accountNickname=accountNickname;
//        this.accountEmail=accountEmail;
//        this.accountName=accountName;
//    }

}

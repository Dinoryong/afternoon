package com.a302.webcuration.domain.Account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account,Long> {
    Account findByAccountEmail(String accountEmail);
    Account findAccountByAccountId(Long id);
}

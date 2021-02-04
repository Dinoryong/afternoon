package com.a302.webcuration.domain.Account;

import com.a302.webcuration.domain.Post.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account,Long> {
    Account findByAccountEmail(String accountEmail);
    Account findAccountByAccountId(Long id);
}

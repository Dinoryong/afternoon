package com.a302.webcuration.domain.Pin;

import com.a302.webcuration.domain.Tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PinRepository extends JpaRepository<Pin,Long> {
    Pin findPinByPinId(long pinId);
}

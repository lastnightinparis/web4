package com.mikirill.jwt.api.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Kir
 * Created on 03.12.2020
 */
@Data
@NoArgsConstructor
public class PointRequest {

    private String username;
    private Integer r;
    private Integer x;
    private Double y;

    public String getUsername() {
        return username;
    }

    public void setUsername(String jsessionid) {
        this.username = jsessionid;
    }

    public Integer getR() {
        return r;
    }

    public void setR(Integer r) {
        this.r = r;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }
}

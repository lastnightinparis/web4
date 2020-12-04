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
    private Double r;
    private Double x;
    private Double y;

    public String getUsername() {
        return username;
    }

    public void setUsername(String jsessionid) {
        this.username = jsessionid;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }
}

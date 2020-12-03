package com.mikirill.jwt.api.entity;

/**
 * @author Kir
 * Created on 02.12.2020
 */


import com.mikirill.jwt.api.validator.RValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Entity
@Table(name = "results")
public class Dot implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @NotNull
    @NotBlank
    @Min(-2)
    @Max(2)
    @Column(name = "x_value")
    private double x_value;
    @NotNull
    @NotBlank
    @Min(-3)
    @Max(5)
    @Column(name = "y_value")
    private double y_value;
    @NotNull
    @NotBlank
    @RValue
    @Column(name = "r_value")
    private int r_value;
    @Column(name = "script_time")
    private double script_time;
    @Column(name = "cur_timestamp")
    private String current_time;
    @Column(name = "hit_result")
    private String hit_result;
    @Column(name = "jsessionid")
    private String jsessionid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX_value() {
        return x_value;
    }

    public void setX_value(double x_value) {
        this.x_value = x_value;
    }

    public double getY_value() {
        return y_value;
    }

    public void setY_value(double y_value) {
        this.y_value = y_value;
    }

    public int getR_value() {
        return r_value;
    }

    public void setR_value(int r_value) {
        this.r_value = r_value;
    }

    public double getScript_time() {
        return script_time;
    }

    public void setScript_time(double script_time) {
        this.script_time = script_time;
    }

    public String getCurrent_time() {
        return current_time;
    }

    public void setCurrent_time(String current_time) {
        this.current_time = current_time;
    }

    public String getJsessionid() {
        return jsessionid;
    }

    public void setJsessionid(String jsessionid) {
        this.jsessionid = jsessionid;
    }

    public String getHit_result() {
        return hit_result;
    }

    public void setHit_result(String hit_result) {
        this.hit_result = hit_result;
    }

    @Override
    public String toString() {
        return "<tr>" +
                "<td>" + this.x_value + "</td>" +
                "<td>" + this.y_value + "</td>" +
                "<td>" + this.r_value + "</td>" +
                "<td>" + this.current_time + "</td>" +
                "<td>" + this.script_time + "</td>" +
                "<td>" + this.hit_result + "</td>" +
                "</tr>";
    }
}

package com.antwibuadum.personal_task_dashboard.new_id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class NewID {
    @Id
    final private Integer newIDValueID = 0;
    private Integer newID;

    public NewID() {
    }

    public NewID(Integer newID) {
        this.newID = newID;
    }

    public Integer getNewID() {
        return newID;
    }

    public void setNewID(Integer newID) {
        this.newID = newID;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        NewID newID1 = (NewID) o;
        return Objects.equals(newID, newID1.newID);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(newID);
    }
}

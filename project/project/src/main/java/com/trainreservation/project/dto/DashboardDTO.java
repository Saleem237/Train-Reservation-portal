package com.trainreservation.project.dto;

public class DashboardDTO {

    private long totalUsers;

    private long totalTrains;

    private long totalBookings;

    private long cancelledBookings;

    private long availableSeats;

    private double totalRevenue;

    public DashboardDTO() {
    }

    public DashboardDTO(long totalUsers,
                        long totalTrains,
                        long totalBookings,
                        long cancelledBookings,
                        long availableSeats,
                        double totalRevenue) {

        this.totalUsers = totalUsers;
        this.totalTrains = totalTrains;
        this.totalBookings = totalBookings;
        this.cancelledBookings = cancelledBookings;
        this.availableSeats = availableSeats;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalTrains() {
        return totalTrains;
    }

    public void setTotalTrains(long totalTrains) {
        this.totalTrains = totalTrains;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public long getCancelledBookings() {
        return cancelledBookings;
    }

    public void setCancelledBookings(long cancelledBookings) {
        this.cancelledBookings = cancelledBookings;
    }

    public long getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(long availableSeats) {
        this.availableSeats = availableSeats;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

}
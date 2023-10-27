package tn.esprit.ms_gestion_utilisateur.Services;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;
import tn.esprit.ms_gestion_utilisateur.Entity.ERole;
import tn.esprit.ms_gestion_utilisateur.Entity.Role;
import tn.esprit.ms_gestion_utilisateur.Entity.User;
import tn.esprit.ms_gestion_utilisateur.Repository.RoleRepository;
import tn.esprit.ms_gestion_utilisateur.Repository.UserRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateUser(Integer userId,User userRequest) {
        User existingUser = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (userRequest.getUsername() != null && !userRequest.getUsername().isEmpty()) {
            existingUser.setUsername(userRequest.getUsername());
        }

        if (userRequest.getPassword() == null || userRequest.getPassword().isEmpty()) {
            userRequest.setPassword(existingUser.getPassword());
        }
        existingUser.setPassword(userRequest.getPassword());

        if (userRequest.getEmail() == null || userRequest.getEmail().isEmpty()) {
            userRequest.setEmail(existingUser.getEmail());
        }
        existingUser.setEmail(userRequest.getEmail());

        if (userRequest.getFirstName() == null || userRequest.getFirstName().isEmpty()) {
            userRequest.setFirstName(existingUser.getFirstName());
        }
        existingUser.setFirstName(userRequest.getFirstName());

        if (userRequest.getLastName() == null || userRequest.getLastName().isEmpty()) {
            userRequest.setLastName(existingUser.getLastName());
        }
        existingUser.setLastName(userRequest.getLastName());

        if (userRequest.getActive() == null ) {
            userRequest.setActive(existingUser.getActive());
        }
        existingUser.setActive(userRequest.getActive());


        return userRepository.save(existingUser);
    }


    public String deleteUser(Integer userId) {
        userRepository.deleteById(userId);
        return userId+"User deleted succesully";
    }

    public List<User> findUsersByRoleClient() {
        return userRepository.findUsersByRole(ERole.CLIENT);
    }

    public List<User> findUsersByRoleAdmin() {
        return userRepository.findUsersByRole(ERole.ADMIN);
    }


    public void exportClientToCsv() throws IOException {
        List<User> clients = userRepository.findUsersByRole(ERole.CLIENT);

        String userHomeDir = System.getProperty("user.home");
        String downloadsDir = userHomeDir + File.separator + "Downloads";
        String excelFilePath = downloadsDir + File.separator + "clients.xlsx";


        // Create a new Excel workbook
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Clients");

            // Create a header row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "USERNAME", "EMAIL", "PASSWORD", "FIRSTNAME", "LASTNAME", "ACTIVE"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            // Fill in data
            int rowNum = 1;
            for (User user : clients) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(user.getId());
                row.createCell(1).setCellValue(user.getUsername());
                row.createCell(2).setCellValue(user.getEmail());
                row.createCell(3).setCellValue(user.getPassword());
                row.createCell(4).setCellValue(user.getFirstName());
                row.createCell(5).setCellValue(user.getLastName());
                row.createCell(6).setCellValue(user.getActive());
            }

            // Write the Excel file
            try (FileOutputStream outputStream = new FileOutputStream(excelFilePath)) {
                workbook.write(outputStream);
            }
        }
    }


    public void exportAdminToCsv() throws IOException {
        List<User> admins = userRepository.findUsersByRole(ERole.ADMIN);

        String userHomeDir = System.getProperty("user.home");
        String downloadsDir = userHomeDir + File.separator + "Downloads";
        String excelFilePath = downloadsDir + File.separator + "admins.xlsx";


        // Create a new Excel workbook
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Admins");

            // Create a header row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "USERNAME", "EMAIL", "PASSWORD", "FIRSTNAME", "LASTNAME", "ACTIVE"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            // Fill in data
            int rowNum = 1;
            for (User user : admins) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(user.getId());
                row.createCell(1).setCellValue(user.getUsername());
                row.createCell(2).setCellValue(user.getEmail());
                row.createCell(3).setCellValue(user.getPassword());
                row.createCell(4).setCellValue(user.getFirstName());
                row.createCell(5).setCellValue(user.getLastName());
                row.createCell(6).setCellValue(user.getActive());
            }

            // Write the Excel file
            try (FileOutputStream outputStream = new FileOutputStream(excelFilePath)) {
                workbook.write(outputStream);
            }
        }
    }



}


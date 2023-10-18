package tn.esprit.ms_gestion_utilisateur.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.ms_gestion_utilisateur.Services.RoleService;

@RestController
@RequestMapping("/role")
public class RoleController {
    @Autowired
    RoleService roleService;
    @PostMapping("/addRole/{role}")
    public void addRole(@PathVariable("role") String role){
        roleService.addRole(role);
    }
    @GetMapping("/test")
    public String test(){
        return "test";
    }
}

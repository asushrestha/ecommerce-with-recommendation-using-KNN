package nce.majorproject.controller;

import lombok.extern.slf4j.Slf4j;
import nce.majorproject.constant.Route;
import nce.majorproject.dto.AdminRegisterRequest;
import nce.majorproject.dto.Response;
import nce.majorproject.services.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Route.ADMIN)
@Slf4j
public class AdminController {
    private AdminServices adminServices;

    @Autowired
    public AdminController(AdminServices adminServices) {
        this.adminServices = adminServices;
    }

    @PostMapping()
    public Response addAdmin(AdminRegisterRequest registerRequest){
        log.info("registering new admin::{}{}",registerRequest.getFullName(),registerRequest.getUserName());
        return adminServices.addAdmin(registerRequest);
    }

}

import { Component } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  styleUrls: ['./notifications.util.component.css']
})
export class NotificationUtilComponent {
    
    constructor(
        private toastr: ToastrService
    ) {

    }

    showNotification(from, align, msg) {    
        const color = Math.floor(1);
    
        this.toastr.info(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+msg+'<b></span>',
            "",
            {
              timeOut: 3000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-info alert-with-icon",
              positionClass: "toast-top-full-width"
            }
          );   
      }


}
<link rel="stylesheet" href="login-model.css">

<div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content bg-dark text-white">
      <div class="modal-header">
        <h5 class="modal-title">User Login / Signup</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body d-flex flex-column justify-content-center align-items-center">

        <ul class="nav nav-pills mb-3" id="login-register-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="tab-login" data-bs-toggle="pill" href="#pane-login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="tab-register" data-bs-toggle="pill" href="#pane-register">Register</a>
          </li>
        </ul>

        <div class="tab-content w-100">

          <!-- LOGIN PANE -->
          <div class="tab-pane fade show active" id="pane-login">
            <form id="loginForm" style="max-width:400px; width:100%;">
              <input type="hidden" name="formType" value="login">
              <div class="mb-3">
                <input type="email" name="loginEmail" class="form-control" placeholder="Email" required>
              </div>
              <div class="mb-3">
                <input type="password" name="loginPassword" class="form-control" placeholder="Password" required>
              </div>
              <div id="loginMessage" class="mb-3 text-center"></div>
              <button type="submit" class="btn btn-pink w-100">Login</button>
            </form>
          </div>

          <!-- REGISTER PANE -->
          <div class="tab-pane fade" id="pane-register">
            <form id="registerForm" style="max-width:400px; width:100%;">
              <input type="hidden" name="formType" value="register">
              <div class="mb-3">
                <input type="text" name="registerName" class="form-control" placeholder="Name" required>
              </div>
              <div class="mb-3">
                <input type="email" name="registerEmail" class="form-control" placeholder="Email" required>
              </div>
              <div class="mb-3">
                <input type="password" name="registerPassword" class="form-control" placeholder="Password" required>
              </div>
              <div id="registerMessage" class="mb-3 text-center"></div>
              <button type="submit" class="btn btn-pink w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="login-model.js"></script>
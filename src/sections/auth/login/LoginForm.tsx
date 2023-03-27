import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { loginUser } from "../../../services/positions.server";
import AuthService from "../../../services/auth.service";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    // setUser(user);
    console.log("user", user);
    console.log("password", password);
    if (typeof(user) === "string" && typeof(password) === "string") {
      const loginInfo = {
        username: user,
        password: password
      }

      // loginUser(loginInfo).then(res => res)
      AuthService.login(user,password).then((r ) =>{
        console.log("RESPONSE: ", r)
        return r;
       })
    }

    

    


    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" id="user"  onChange={(e) => setUser(e.target.value)} value={user} />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {/* <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} /> */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
 
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}

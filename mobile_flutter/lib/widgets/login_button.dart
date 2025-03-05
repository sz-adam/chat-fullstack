import 'package:flutter/material.dart';

class LoginButton extends StatelessWidget {
  final bool isLoggedIn;
  final VoidCallback onPressed;

  LoginButton({required this.isLoggedIn, required this.onPressed});
//* Átalakítani a regisztrációhóz*/
  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 500),
      width: isLoggedIn ? 50 : 140,
      height: 50,
      decoration: BoxDecoration(
        gradient:
            const LinearGradient(colors: [Colors.greenAccent, Colors.teal]),
        borderRadius: BorderRadius.circular(isLoggedIn ? 50 : 20),
        boxShadow: const [
          BoxShadow(color: Colors.black26, blurRadius: 8, offset: Offset(2, 4)),
        ],
      ),
      child: isLoggedIn
          ? const Center(child: Icon(Icons.check, color: Colors.white))
          : TextButton(
              onPressed: onPressed,
              child: const Text("Login",
                  style: TextStyle(color: Colors.white, fontSize: 18)),
            ),
    );
  }
}

import 'package:flutter/material.dart';

class AuthButton extends StatelessWidget {
  final bool isLoggedIn;
  final VoidCallback onPressed;
  final String buttonText;

  AuthButton(
      {required this.isLoggedIn,
      required this.onPressed,
      required this.buttonText});
//* Átalakítani a regisztrációhóz*/
  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 500),
      width: isLoggedIn ? 50 : 140,
      height: 50,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Colors.greenAccent, Colors.teal],
        ),
        borderRadius: BorderRadius.circular(isLoggedIn ? 50 : 20),
        boxShadow: const [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 8,
            offset: Offset(2, 4),
          ),
        ],
      ),
      child: isLoggedIn
          ? const Center(child: Icon(Icons.check, color: Colors.white))
          : TextButton(
              onPressed: onPressed,
              child: Text(
                buttonText,
                style: const TextStyle(color: Colors.white, fontSize: 18),
              ),
            ),
    );
  }
}

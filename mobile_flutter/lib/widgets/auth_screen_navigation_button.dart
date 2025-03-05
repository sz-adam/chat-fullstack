import 'package:flutter/material.dart';

class AuthScreenNavigationButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onPressed;

  const AuthScreenNavigationButton({
    Key? key,
    required this.icon,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 0,
      right: 30,
      child: Container(
        height: 100,
        width: 80,
        decoration: BoxDecoration(
          color: Colors.green.shade500,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(50)),
        ),
        child: Center(
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              shape: const CircleBorder(),
              backgroundColor: Colors.white.withOpacity(0.3),
              elevation: 0,
              padding: const EdgeInsets.all(15),
            ),
            onPressed: onPressed,
            child: Icon(icon, color: Colors.white, size: 24),
          ),
        ),
      ),
    );
  }
}

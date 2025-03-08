import 'package:flutter/material.dart';

class CustomCheckbox extends StatelessWidget {
  final String label;
  final bool isSelected;
  final Color activeColor;
  final VoidCallback onTap;

  const CustomCheckbox({
    Key? key,
    required this.label,
    required this.isSelected,
    required this.activeColor,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        children: [
          Checkbox(
            value: isSelected,
            onChanged: (bool? value) => onTap(),
            activeColor: activeColor,
          ),
          const SizedBox(width: 8),
          Text(
            label,
            style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}

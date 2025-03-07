class User {
  int id;
  String fullName;
  String email;
  String? profilePic;
  bool isDarkMode;
  String createdAt;
  String updatedAt;
  int unreadMessages;

  User({
    required this.id,
    required this.fullName,
    required this.email,
    this.profilePic,
    required this.isDarkMode,
    required this.createdAt,
    required this.updatedAt,
    required this.unreadMessages,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      fullName: json['fullName'],
      email: json['email'],
      profilePic: json['profilePic'],
      isDarkMode: json['isDarkMod'],
      createdAt: json['createdAt'] ?? '',
      updatedAt: json['updatedAt'] ?? '',
      unreadMessages: json['unreadMessages'] ?? 0,
    );
  }
}

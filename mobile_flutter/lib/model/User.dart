class User {
  int id;
  String fullName;
  String email;
  String? profilePic;
  bool isDarkMod;
  String createdAt;
  String updatedAt;
  int unreadMessages;
  String? password;

  User({
    required this.id,
    required this.fullName,
    required this.email,
    this.profilePic,
    required this.isDarkMod,
    required this.createdAt,
    required this.updatedAt,
    required this.unreadMessages,
    this.password,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      fullName: json['fullName'] ,
      email: json['email'] ?? 'N/A',
      profilePic: json['profilePic'],
      isDarkMod: json['isDarkMod'] ?? false,
      createdAt: json['createdAt'] ?? '',
      updatedAt: json['updatedAt'] ?? '',
      unreadMessages: json['unreadMessages'] ?? 0,
      password: json['password'],
    );
  }
}

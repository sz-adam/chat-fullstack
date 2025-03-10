class Message {
  int id;
  int senderId;
  int receiverId;
  String text;
  String createdAt;
  String updatedAt;

  Message({
    required this.id,
    required this.senderId,
    required this.receiverId,
    required this.text,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
      id: json['id'],
      senderId: json['senderId'],
      receiverId: json['receiverId'],
      text: json['text'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
    );
  }
}

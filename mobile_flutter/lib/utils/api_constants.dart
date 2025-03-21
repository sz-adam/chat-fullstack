class ApiConstants {
  static const String _baseUrl = "http://192.168.100.14:5001/api/";

  // Auth endpoints
  static const String login = "${_baseUrl}auth/login";
  static const String checkAuth = "${_baseUrl}auth/check";
  static const String logout = "${_baseUrl}auth/logout";
  static const String register = "${_baseUrl}auth/signup";

  //users endpoint
  static const String allUser = "${_baseUrl}messages/users";

  //messages endpoints
  static String getMessages(int partnerId) {
    return "${_baseUrl}messages/$partnerId";
  }

  //üzenet küldése
  static String sendMessage(int partnerId) {
    return "${_baseUrl}messages/send/$partnerId";
  }

  //üzenet törlése
  static String deleteMessage(int messageId) {
    return "${_baseUrl}messages/delete/$messageId";
  }
}

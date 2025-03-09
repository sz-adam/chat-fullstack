class ApiConstants {
  static const String _baseUrl = "http://192.168.100.14:5001/api/";

  // Auth endpoints
  static const String login = "${_baseUrl}auth/login";
  static const String checkAuth ="${_baseUrl}auth/check";
  static const String logout ="${_baseUrl}auth/logout";
  static const String register ="${_baseUrl}auth/signup";

  //users endpoint
  static const String allUser ="${_baseUrl}messages/users";



}

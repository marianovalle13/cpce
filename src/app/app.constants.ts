export class Constants {

  public static API_BASE_URL = 'http://capacitaciononline.org.ar';
  public static FILES_BASE_URL = 'http://vps-1060583-x.dattaweb.com:3071/files';


  public static storage = {
    user: "", //aca esta guardado el usuario logueado
    accessToken: '1234'
  };

  public static DEFAULT_NO_IMAGE = 'assets/imgs/norden.jpg';
  public static DEFAULT_AVATAR_NO_IMAGE = 'assets/imgs/avatar.png';
  public static API_METHOD_FILE_UPLOAD = '/files/upload';
  public static API_METHOD_LOGIN = '/ws/login/'
  public static API_METHOD_TRAINING = '/ws/trainings/';
  public static API_METHOD_CERTIFIED = '/ws/users/certificate/';
  public static API_METHOD_CATEGORIES = '/ws/trainings/categories/';
  public static API_METHOD_MYACCOUNT = '/ws/myaccount/';
  public static API_METHOD_POLL = '/ws/users/';
  public static API_METHOD_POLL_SET = '/ws/users/poll/set/';
  public static API_METHOD_SENDCHAT = '/ws/savechat/';

  // PUSH SERVER ENDPOINTS
  public static PUSH_APP_ID = '5ea84626fe8aa7310c7f8db4';
  public static PUSH_SERVER_URL = 'http://sd-1060583-h00012.ferozo.net:3050/api';
  public static PUSH_SERVER_REGISTER_ID = '/users/ensure';
  public static PUSH_GET_MESSAGE = '/message/';
  public static PUSH_ICON_COLOR = '#001C6F';
  public static PUSH_ICON_NAME = 'ic_stat_notifications';

}

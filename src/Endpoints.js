export const dev = {
  baseURL: 'http://localhost:8005/api/',
  sla: 'kpi/sla/',
  numIncident: 'kpi/num_incident/',
  availability: 'kpi/availability/',
  userInfo: 'admin/user/myinfo/',
  login: 'admin/login/',
  logout: 'admin/logout/',
  register: 'admin/registration/',
  insertIncidents: 'insert/incident/',
  insertCritical: 'insert/critical/'
};

export const prod = {
  baseURL: '/api/',
  sla: 'kpi/sla/',
  numIncident: 'kpi/num_incident/',
  availability: 'kpi/availability/',
  userInfo: 'admin/user/myinfo/',
  login: 'admin/login/',
  logout: 'admin/logout/',
  register: 'admin/registration/',
  insertIncidents: 'insert/incident/',
  insertCritical: 'insert/critical/'
};

import axios, { AxiosResponse } from "axios";

// -------------------- Types --------------------
export interface StaffMember {
  id: number;
  name: string;
  role: string;
  department?: { name: string } | null;
  image?: string | null;
  email?: string | null;
  phone?: string | null;
  social_links?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  } | null;
  position?: string;
}

export interface DownloadItem {
  id: number;
  title: string;
  file: string;
  description: string;
  uploaded_at: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  link: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  type: string; // "Image" or "Video"
  image: string;
  caption: string;
  uploaded_at: string;
}

export interface AcademicItem {
  id: number;
  title: string;
  description: string;
  file?: string | null; 
  created_at?: string;
}

export interface Course {
  id: number;
  title: string;
  type: "Full-Time" | "Part-Time";
  description: string;
  duration: string;
  fee?: number; 
  method?: string; 
  department?: {
    id: number;
    name: string;
    description?: string;
  };
  image?: string;
  created_at: string;
}



export interface Department {
  id: number;
  name: string;
  description: string;
  head?: string;
  image?: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  map_url: string;
}

// -------------------- Base URL --------------------
const BASE_URL = "http://127.0.0.1:8000/api";

// -------------------- Generic Helpers --------------------
const getRequest = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(url);
  return response.data;
};

const postRequest = async <T>(url: string, data: any, isFormData = false): Promise<T> => {
  const response: AxiosResponse<T> = await axios.post(url, data, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
  });
  return response.data;
};

const putRequest = async <T>(url: string, data: any, isFormData = false): Promise<T> => {
  const response: AxiosResponse<T> = await axios.put(url, data, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
  });
  return response.data;
};

const deleteRequest = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.delete(url);
  return response.data;
};

// -------------------- API --------------------
export const api = {
  // Staff
  getStaff: (): Promise<StaffMember[]> => getRequest(`${BASE_URL}/staff/`),
  getStaffById: (id: number): Promise<StaffMember> => getRequest(`${BASE_URL}/staff/${id}/`),
  postStaff: (data: FormData): Promise<StaffMember> => postRequest(`${BASE_URL}/staff/`, data, true),
  putStaff: (id: number, data: FormData): Promise<StaffMember> =>
    putRequest(`${BASE_URL}/staff/${id}/`, data, true),
  deleteStaff: (id: number): Promise<void> => deleteRequest(`${BASE_URL}/staff/${id}/`),

  // Courses
  getCourses: (): Promise<Course[]> => getRequest(`${BASE_URL}/courses/`),
  getCourseById: (id: number): Promise<Course> => getRequest(`${BASE_URL}/courses/${id}/`),
  postCourse: (data: FormData): Promise<Course> => postRequest(`${BASE_URL}/courses/`, data, true),
  putCourse: (id: number, data: FormData): Promise<Course> =>
    putRequest(`${BASE_URL}/courses/${id}/`, data, true),
  deleteCourse: (id: number): Promise<void> => deleteRequest(`${BASE_URL}/courses/${id}/`),

  // Departments
  getDepartments: (): Promise<Department[]> => getRequest(`${BASE_URL}/departments/`),
  getDepartmentById: (id: number): Promise<Department> => getRequest(`${BASE_URL}/departments/${id}/`),
  postDepartment: (data: FormData): Promise<Department> =>
    postRequest(`${BASE_URL}/departments/`, data, true),
  putDepartment: (id: number, data: FormData): Promise<Department> =>
    putRequest(`${BASE_URL}/departments/${id}/`, data, true),
  deleteDepartment: (id: number): Promise<void> => deleteRequest(`${BASE_URL}/departments/${id}/`),

  // Gallery
  getGallery: (): Promise<GalleryItem[]> => getRequest(`${BASE_URL}/gallery/`),
  getGalleryItem: (id: number): Promise<GalleryItem> => getRequest(`${BASE_URL}/gallery/${id}/`),
  postGallery: (data: FormData): Promise<GalleryItem> => postRequest(`${BASE_URL}/gallery/`, data, true),
  deleteGallery: (id: number): Promise<void> => deleteRequest(`${BASE_URL}/gallery/${id}/`),

  // News
  getNews: (): Promise<NewsItem[]> => getRequest(`${BASE_URL}/news/`),
  getNewsById: (id: number): Promise<NewsItem> => getRequest(`${BASE_URL}/news/${id}/`),
  postNews: (data: FormData): Promise<NewsItem> => postRequest(`${BASE_URL}/news/`, data, true),
  putNews: (id: number, data: FormData): Promise<NewsItem> =>
    putRequest(`${BASE_URL}/news/${id}/`, data, true),
  deleteNews: (id: number): Promise<void> => deleteRequest(`${BASE_URL}/news/${id}/`),

  // Downloads
  getDownloads: (): Promise<DownloadItem[]> => getRequest(`${BASE_URL}/downloads/`),
  getDownloadById: (id: number): Promise<DownloadItem> => getRequest(`${BASE_URL}/downloads/${id}/`),
  postDownload: (data: FormData): Promise<DownloadItem> => postRequest(`${BASE_URL}/downloads/`, data, true),
  putDownload: (id: number, data: FormData): Promise<DownloadItem> =>
    putRequest(`${BASE_URL}/downloads/${id}/`, data, true),
  deleteDownload: (id: number): Promise<void> => deleteRequest(`${BASE_URL}/downloads/${id}/`),

  // Contacts
  getContacts: <T>(): Promise<T> => getRequest(`${BASE_URL}/contacts/`),
  postContact: (data: { name: string; email: string; message: string }) =>
    postRequest(`${BASE_URL}/contacts/`, data),

  // Dynamic Contact Details
  getContactDetails: (): Promise<ContactDetails[]> => getRequest<ContactDetails[]>(`${BASE_URL}/contact-details/`),

  // Academic Items
  getAcademicItems: (): Promise<AcademicItem[]> => getRequest(`${BASE_URL}/academics/`),
  getAcademicItemById: (id: number): Promise<AcademicItem> =>
    getRequest(`${BASE_URL}/academics/${id}/`),
  postAcademicItem: (data: FormData): Promise<AcademicItem> =>
    postRequest(`${BASE_URL}/academics/`, data, true),
  putAcademicItem: (id: number, data: FormData): Promise<AcademicItem> =>
    putRequest(`${BASE_URL}/academics/${id}/`, data, true),
  deleteAcademicItem: (id: number): Promise<void> =>
    deleteRequest(`${BASE_URL}/academics/${id}/`),
};

export interface MentorStudent {
    id: string;
    name: string;
    profile_img: string;
    cover_img: string;
    age: number;
    learning_level: string;
    fluency: string;
    status: string;
    contact: string;
    join_date: string;
    last_progress?: string;
}

export interface MentorDetail {
    id: string;
    name: string;
    email: string;
    role: string;
    students: MentorStudent[];
}

export interface MentorDetailResponse {
    success: boolean;
    message: string;
    data: MentorDetail;
}
async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost/server/src/api/Login.php', {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: JSON.stringify({ username: username, password: password }),
        }).then((response) => {
            response.json().then((obj) => {
                /*
                if(obj === 0 ) {        //Da modificare in base a quanto ritorna il server. Sarebbe utile che ritorni l'id o anche nome e cognome la visualizzare, e il ruolo
                    reject(obj);
                } else {
                    resolve(obj);
                }
                */
                resolve(obj);
            })
                .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) });
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) });
    });
}

async function logout() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost/server/api/logout.php')      //Da verificare
            .then((response) => {
                if (response.ok) {
                    resolve(0);
                }
                else {
                    reject();
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}

//Ritorna le lezioni prenotabili dallo studente
async function getBookableStudentLectures(studentId) {
    const url = "http://localhost/server/bookableLessons/" + studentId;
    const response = await fetch(url);
    const lectures = await response.json();
    if (response.ok) {
        if (lectures === 0) {
            return [];
        }
        return lectures;
    } else {
        let err = { status: response.status, errorObj: lectures };
        throw err;
    }
}

//Ritorna le prenotazioni effettuate dagli studenti per la lezione indicata (teacher side)
async function getBooking(lectureId) {
    const url = "http://localhost/server/bookedStudentsForLecture/" + lectureId;
    const response = await fetch(url);
    const booking = await response.json();
    if (response.ok) {
        if (booking === 0) {
            return [];
        }
        return booking;
    } else {
        let err = { status: response.status, errorObj: booking };
        throw err;
    }
}

// API to retrieve all the bookings of a student
async function getStudentBookings(studentId) {
    const url = "http://localhost/server/studentBookings/" + studentId;
    const response = await fetch(url);
    const booking = await response.json();
    if (response.ok) {
        if (booking === 0) {
            return [];
        }
        return booking;
    } else {
        let err = { status: response.status, errorObj: booking };
        throw err;
    }
}

// API to retrieve all the lectures the student is waiting for
async function getWaitingBookings(studentId) {
    const url = "http://localhost/server/waitingLessons/" + studentId;
    const response = await fetch(url);
    const booking = await response.json();
    if (response.ok) {
        if (booking === 0) {
            return [];
        }
        return booking;
    } else {
        let err = { status: response.status, errorObj: booking };
        throw err;
    }
}

//API per prenotare un posto a lezione
async function bookASeat(lectureId, studentId, date) {
    const url = "http://localhost/server/insertLecture"
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: JSON.stringify({
            idLesson: lectureId,
            idUser: studentId,
            date: date
        }),
    });

    try {
        const resJ = await response.json();
        if (response.ok) {
            return resJ;
        } else {
            let err = { status: response.status, errorObj: resJ };
            throw err;
        }
    }
    catch (e) {
        console.log("Error in booking a seat: " + e);
        return 0;   //meaning: no new customer
    }
}

// API to retrieve all the lectures of a teacher
async function getTeacherLectures(teacherId) {
    const url = "http://localhost/server/scheduledLecturesForTeacher/" + teacherId
    const response = await fetch(url);
    const lectures = await response.json();
    if (response.ok) {
        if (lectures === 0) {
            return [];
        }
        return lectures;
    } else {
        let err = { status: response.status, errorObj: lectures };
        throw err;
    }
}

async function deleteBooking(bookingId) {
    const url = "http://localhost/server/updateBooking/" + bookingId;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: JSON.stringify({
            }),
        }).then((response) => {
            if (response.ok) {
                resolve(0);
            } else {
                reject({ errore: "Error in deleting a booking" });
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) });
    });
}

async function deleteLecture(lectureId) {
    const url = "http://localhost/server/deleteLecture/" + lectureId;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: JSON.stringify({
        }),
    });
    const result = await response.json();
    if (response.ok) {
        if (result === 1) {
            return 1;
        } else {
            console.log("Too late to delete the lecture");
            return -1;
        }
    } else {
        let err = { status: response.status, errorObj: result };
        throw err;
    }
}

async function changeToOnline(lectureId) {
    const url = "http://localhost/server/changeToOnline/" + lectureId;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: JSON.stringify({
        }),
    });
    const result = await response.json();
    if (response.ok) {
        if (result === 1) {
            return 1;
        } else {
            console.log("Too late to change the lecture");
            return -1;
        }
    } else {
        let err = { status: response.status, errorObj: result };
        throw err;
    }
}

async function getAllCourses() {
    const url = "http://localhost/server/courses";

    const response = await fetch(url);
    const courses = await response.json();
    if (response.ok) {
        if (courses === 0) {
            return [];
        }
        return courses;
    } else {
        let err = { status: response.status, errorObj: courses };
        throw err;
    }
}

const ALL_COURSES_FILTER = "L.idCourse";
async function getBookingStatisticsByMonth(courseIds) {
    const url = `http://localhost/server/bookingStatistics/?filterTime=year,monthOfYear&filterCourse=${courseIds.toString()}`;

    const response = await fetch(url);
    const stats = await response.json();
    if (response.ok) {
        if (stats === 0) {
            return [];
        }
        return stats;
    } else {
        let err = { status: response.status, errorObj: stats };
        throw err;
    }
}
async function getBookingStatisticsByWeek(courseIds) {
    const url = `http://localhost/server/bookingStatistics/?filterTime=year_month_week&filterCourse=${courseIds.toString()}`;

    const response = await fetch(url);
    const stats = await response.json();
    if (response.ok) {
        if (stats === 0) {
            return [];
        }
        return stats;
    } else {
        let err = { status: response.status, errorObj: stats };
        throw err;
    }
}
async function getBookingStatisticsByLesson(courseIds) {
    const url = `http://localhost/server/bookingStatistics/?filterTime=L.idLesson&filterCourse=${courseIds.toString()}`;

    const response = await fetch(url);
    const stats = await response.json();
    if (response.ok) {
        if (stats === 0) {
            return [];
        }
        return stats;
    } else {
        let err = { status: response.status, errorObj: stats };
        throw err;
    }
}

async function getCancellationsStatisticsByMonth(courseIds) {
    const url = `http://localhost/server/bookingStatistics/?filterTime=year,monthOfYear&filterCourse=${courseIds.toString()}&type=0`;

    const response = await fetch(url);
    const stats = await response.json();
    if (response.ok) {
        if (stats === 0) {
            return [];
        }
        return stats;
    } else {
        let err = { status: response.status, errorObj: stats };
        throw err;
    }
}
async function getCancellationsStatisticsByWeek(courseIds) {
    const url = `http://localhost/server/bookingStatistics/?filterTime=year_month_week&filterCourse=${courseIds.toString()}&type=0`;

    const response = await fetch(url);
    const stats = await response.json();
    if (response.ok) {
        if (stats === 0) {
            return [];
        }
        return stats;
    } else {
        let err = { status: response.status, errorObj: stats };
        throw err;
    }
}
async function getCancellationsStatisticsByLesson(courseIds) {
    const url = `http://localhost/server/bookingStatistics/?filterTime=L.idLesson&filterCourse=${courseIds.toString()}&type=0`;

    const response = await fetch(url);
    const stats = await response.json();
    if (response.ok) {
        if (stats === 0) {
            return [];
        }
        return stats;
    } else {
        let err = { status: response.status, errorObj: stats };
        throw err;
    }
}

async function getCoursesOfTeacher(teacherId) {
    const url = "http://localhost/server/teacherCourses/" + teacherId;

    const response = await fetch(url);
    const courses = await response.json();
    if (response.ok) {
        if (courses === 0) {
            return [];
        }
        return courses;
    } else {
        let err = { status: response.status, errorObj: courses };
        throw err;
    }
}

async function getFullLectures(studentId) {
    const url = "http://localhost/server/lecturesWithFullRoom/" + studentId;
    const response = await fetch(url);
    const lectures = await response.json();
    if (response.ok) {
        if (lectures === 0) {
            return [];
        }
        return lectures;
    } else {
        let err = { status: response.status, errorObj: lectures };
        throw err;
    }
}

async function getTeacherStatistics(teacherId, filterTime, courseIds) {
    const url = "http://localhost/server/teacherStatistics/" + teacherId + "?filterTime=" + filterTime + `&filterCourse=${courseIds.toString()}`;

    const response = await fetch(url);

    /* //if the backend returns an error, this prints the message (instead .json() just fails)
    const text = await response.text();
    console.log(text)
    */

    const stats = await response.json();
    if (response.ok) {
        if (stats === 0) {
            return [];
        }
        return stats;
    } else {
        let err = { status: response.status, errorObj: stats };
        throw err;
    }
}

async function setUpStudents(jsonData) {
    const url = "http://localhost/server/setUpStudents"
    /*
    The backend needs the data like this:
    var jsonDataDebug = [
      {
        "Id": 900000,
        "Name": 'Ambra',
        "Surname": 'Ferri',
        "City": "Poggio Ferro",
        "OfficialEmail": "s900000@students.politu.it",
        "Birthday": "1991-11-04",
        "SSN": "MK97060783"
      },
      {
        "Id": 900001,
        "Name": 'Gianfranco',
        "Surname": 'Trentini',
        "City": "Fenestrelle",
        "OfficialEmail": "s900001@students.politu.it",
        "Birthday": "1991-11-05",
        "SSN": "SP80523410"
      }
    ];
    */

    var bodyToSend = JSON.stringify(jsonData);
    //console.log(bodyToSend);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: bodyToSend,
    });

    try {
        /*
        //useful if server returns error, it lets you see the error message
        const text = await response.text();
        console.log(text)
        */

        const resJ = await response.json();
        if (response.ok) {
            return resJ;
        } else {
            let err = { status: response.status, errorObj: resJ };
            throw err;
        }

    }
    catch (e) {
        console.log("Error in POST /setUpStudents: " + e);
        throw e;
    }
}

async function setUpProfessors(jsonData) {
    const url = "http://localhost/server/setUpProfessors"

    var bodyToSend = JSON.stringify(jsonData);
    //console.log(bodyToSend);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: bodyToSend,
    });

    try {
        /*
        //useful if server returns error, it lets you see the error message
        const text = await response.text();
        console.log(text)
        */

        const resJ = await response.json();
        if (response.ok) {
            return resJ;
        } else {
            let err = { status: response.status, errorObj: resJ };
            throw err;
        }

    }
    catch (e) {
        console.log("Error in POST /setUpProfessors: " + e);
        throw e;
    }
}

async function setUpCourses(jsonData) {
    const url = "http://localhost/server/setUpCourses"

    var bodyToSend = JSON.stringify(jsonData);
    //console.log(bodyToSend);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: bodyToSend,
    });

    try {
        /*
        //useful if server returns error, it lets you see the error message
        const text = await response.text();
        console.log(text)
        */

        const resJ = await response.json();
        if (response.ok) {
            return resJ;
        } else {
            let err = { status: response.status, errorObj: resJ };
            throw err;
        }

    }
    catch (e) {
        console.log("Error in POST /setUpCourses: " + e);
        throw e;
    }
}

async function setUpLectures(jsonData) {
    const url = "http://localhost/server/setUpLessons"

    var bodyToSend = JSON.stringify(jsonData);
    //console.log(bodyToSend);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: bodyToSend,
    });

    try {
        /*
        //useful if server returns error, it lets you see the error message
        const text = await response.text();
        console.log(text)
        */

        const resJ = await response.json();
        if (response.ok) {
            return resJ;
        } else {
            let err = { status: response.status, errorObj: resJ };
            throw err;
        }

    }
    catch (e) {
        console.log("Error in POST /setUpLessons: " + e);
        throw e;
    }
}

async function setUpClasses(jsonData) {
    const url = "http://localhost/server/setUpEnrollment"

    var bodyToSend = JSON.stringify(jsonData);
    //console.log(bodyToSend);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: bodyToSend,
    });

    try {
        /*
        //useful if server returns error, it lets you see the error message
        const text = await response.text();
        console.log(text)
        */

        const resJ = await response.json();
        if (response.ok) {
            return resJ;
        } else {
            let err = { status: response.status, errorObj: resJ };
            throw err;
        }

    }
    catch (e) {
        console.log("Error in POST /setUpEnrollment: " + e);
        throw e;
    }
}

async function getAllStudents() {
    const url = "http://localhost/server/students";

    const response = await fetch(url);
    const students = await response.json();
    if (response.ok) {
        if (students === 0) {
            return [];
        }
        return students;
    } else {
        let err = { status: response.status, errorObj: students };
        throw err;
    }
}

   //  list of people in contact with a student
async function getStudentContacts(studentId) {
    const url = "http://localhost/server/findStudentContacts/" + studentId;

    const response = await fetch(url);
    const people = await response.json();
    if (response.ok) {
        if (people === 0) {
            return [];
        }
        return people;
    } else {
        let err = { status: response.status, errorObj: people };
        throw err;
    }
}

const API = {
    userLogin, logout, getBookableStudentLectures, getBooking, getStudentBookings, bookASeat, deleteBooking, getTeacherLectures, deleteLecture, changeToOnline, getAllCourses,
    getBookingStatisticsByMonth, getBookingStatisticsByWeek, getBookingStatisticsByLesson, getCancellationsStatisticsByMonth, getCancellationsStatisticsByWeek, getCancellationsStatisticsByLesson, ALL_COURSES_FILTER,
    getCoursesOfTeacher, getFullLectures, getTeacherStatistics, setUpStudents, setUpProfessors, setUpCourses, setUpLectures, setUpClasses, getAllStudents, getWaitingBookings, getStudentContacts
};
export default API;

// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';
import LoginComponent from './components/LoginComponent';

function App() {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Sport-Story T-shirt', price: 499, image: 'https://www.soccerbible.com/media/137648/argentina-5-min.jpg' },
        { id: 2, name: 'Sport-Story Bag', price: 699, image: 'https://i.pinimg.com/originals/0b/f3/db/0bf3dbcc2b5123e51e0b8892ec4965a4.jpg' },
        { id: 3, name: 'Sport-Story Hoodie', price: 799, image: 'https://jaraguar.com/wp-content/uploads/2022/10/81751946-1.jpg' }
    ]);

    const [cartCourses, setCartCourses] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([
        { username: 'admin1', password: 'password' },
        { username: 'user', password: 'user123' }
    ]);
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        const storedCount = localStorage.getItem('visitorCount');
        if (storedCount) {
            setVisitorCount(parseInt(storedCount));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('visitorCount', visitorCount.toString());
    }, [visitorCount]);

    const addCourseToCartFunction = (course) => {
        const existingCourse = cartCourses.find((item) => item.product.id === course.id);
        if (existingCourse) {
            setCartCourses((prevCourses) =>
                prevCourses.map((item) =>
                    item.product.id === course.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartCourses((prevCourses) => [...prevCourses, { product: course, quantity: 1 }]);
        }
    };

    const deleteCourseFromCartFunction = (course) => {
        setCartCourses((prevCourses) => prevCourses.filter((item) => item.product.id !== course.id));
    };

    const totalAmountCalculationFunction = () => {
        return cartCourses.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const handleCourseSearchChange = (event) => {
        setSearchCourse(event.target.value);
    };

    const handleLogin = (username, password) => {
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
            setIsLoggedIn(true);
            setVisitorCount(visitorCount + 1);
        } else {
            alert('Invalid username or password');
        }
    };

    const handlePaymentSuccess = () => {
        console.log('Payment successful!');
        // Perform any actions after a successful payment, e.g., clearing the cart
        setCartCourses([]);
    };

    return (
        <div className="App">
            <div className="visitor-count">Visitors: {visitorCount}</div>
            {!isLoggedIn ? (
                <LoginComponent onLogin={handleLogin} />
            ) : (
                <>
                    <SearchComponent
                        searchCourse={searchCourse}
                        courseSearchUserFunction={handleCourseSearchChange}
                    />
                    <main className="App-main">
                        <ShowCourseComponent
                            courses={courses}
                            filterCourseFunction={courses.filter((course) =>
                                course.name.toLowerCase().includes(searchCourse.toLowerCase())
                            )}
                            addCourseToCartFunction={addCourseToCartFunction}
                        />
                        <UserCartComponent
                            cartCourses={cartCourses}
                            deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                            totalAmountCalculationFunction={totalAmountCalculationFunction}
                            setCartCourses={setCartCourses}
                            onPaymentSuccess={handlePaymentSuccess}
                        />
                    </main>
                </>
            )}
        </div>
    );
}

export default App;

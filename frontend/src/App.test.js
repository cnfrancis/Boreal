import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.js';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import HomePage from './Components/Pages/HomePage.js';
import ManageProfilePage from './Components/Pages/ManageProfilePage.js';
import ShoppingCartPage from './Components/Pages/ShoppingCartPage.js';


it('renders Default pagewithout crashing', () => {
  render(<App />);
});

// Test data for test
const products = [
  {
    _id: '001',
    title: 'Isaac Asimov: The Complete Stories, Vol. 1',
    description: 'Isaac Asimov best work In a world of robots how can we keep on keeping on.',
    price: '9.99',
    img: 'isaac_asimov.jpeg'
  },
  {
    _id: '002',
    title: 'The Little Prince1',
    description: 'The Little Prince is a novella by French aristocrat, writer, and military aviator Antoine de Saint-Exupéry.',
    price: '12.99',
    img: 'le_petit_prince.jpg'
  },
  {
    _id: '003',
    title: 'The Devil Wears Prada',
    description: 'The Devil Wears Prada is a 2003 novel by Lauren Weisberger about a young woman who is hired as a personal assistant to a powerful fashion magazine editor.',
    price: '12.99',
    img: 'the_devil_wears_prada.jpg'
  },
  {
    _id: '004',
    title: "Harry Potter and the Philosopher's Stone",
    description: 'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive.',
    price: '26.99',
    img: 'harry_potter_and_philosopher_stone.jpg'
  },
  {
    _id: '005',
    title: 'The Silent Patient',
    description: 'The Silent Patient is a 2019 psychological thriller novel written by British–Cypriot author Alex Michaelides.',
    price: '23.99',
    img: 'the_silent_patient.jpg'
  },
  {
    _id: '006',
    title: '1984',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    price: '7.99',
    img: '1984.jpg'
  }
];

const MockHomePageComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={products ? <HomePage items={products} /> : <Spinner animation="border" variant="primary" />} />
      </Routes>
    </BrowserRouter>
  )
}

const MockEditProfileComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editprofile" element={<ManageProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

const MockShoppingCartPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cartpage" element={<ShoppingCartPage list={products}/>}/>
      </Routes>
    </BrowserRouter>
  )
}


it('renders homepage with all items (Browsing items feature) correctly with test data', async () => {
  render(<MockHomePageComponent />);
  //const buttonsElement = screen.findAllByDisplayValue("Add to cart");
  
});


it('renders editprofile (Managing profile feature) correctly with test data', async () => {
  render(<MockEditProfileComponent />);
  
});

it('renders customer cart (Adding item to shopping carts correctly with test data', async () => {
  render(<MockShoppingCartPage />);
});


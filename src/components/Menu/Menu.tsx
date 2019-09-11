import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

export interface IMenuItem{
  name: string,
  price: string
}

export interface IMenu{
  courseName: string,
  menuListing: IMenuItem[]
}

export interface IMenuState {
  tastingMenu: IMenuItem[],
  // starters: IMenuItem[],
  // firstCourses: IMenuItem[],
  // mainCourses: IMenuItem[]
  menu: IMenu[]
}

class Menu extends Component <{}, IMenuState>{
  constructor(props: any) {
    super(props);
    this.state = {
        tastingMenu:[
          {name: '12-Course tasting menu', price:'€ 290'},
          {name: 'Wine pairing', price:'€ 190'},
        ],
        menu:[
          { courseName: 'Starters',
            menuListing:[
              {name: 'Abstract of grilled snapper… and mozzarella', price:'€ 80'},
              {name: 'An eel swimming up the Po River', price:'€ 80'},
              {name: 'Five ages of Parmigiano Reggiano in different textures', price:'€ 80'},
              {name: 'Angus beef ages 42 months served with apple jelly', price:'€ 80'},
            ]
          },
          { courseName: 'First Courses',
            menuListing:[
              {name: 'Spaghetti alla chitarra with seared amberjack', price:'€ 80'},
              {name: 'Rice as if it were a Bouillabaisse', price:'€ 80'},
              {name: 'Ravioli of leeks, foie gras and truffle', price:'€ 80'},
              {name: 'Modenese miniature tortellini served in capon broth', price:'€ 80'},
              ]
          },
          { courseName: 'main Courses',
          menuListing:[
              {name: 'Lobster in double sauce, acidic and sweet', price:'€ 110'},
              {name: 'We are still deciding what fish to serve!', price:'€ 110'},
              {name: 'This little piggy went to the market', price:'€ 110'},
              {name: 'A singular interpretation of Fillet alla Rossini', price:'€ 150'},
              {name: 'Ox rib eye served with aromatic herbs', price:'€ 110'},
            ]
          }
        ]
      }    
    }
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }

 
  render() {
    const testingMenuItems = this.state.tastingMenu.map((testingMenuItem, i) =>
        <div key={i}>
          <div className="menu-items-container">
            <p>{testingMenuItem.name}</p>
            <p>{testingMenuItem.price}</p>
          </div>
          <hr/> 
        </div>
    );

    const menuCourses = this.state.menu.map((menuCourse, i) =>
      <div className="menucourse-wrapper" key={i}>
        <h4>{menuCourse.courseName}</h4>
          {
            menuCourse.menuListing.map((menuItem, i) =>
              <div key={i}>
                <div className="menu-items-container">
                <p>{menuItem.name}</p>
                <p>{menuItem.price}</p>
                </div>
          <hr/> 
              </div>
            )
          }
      </div>
    );

    return (
      <div>
        <div className="parallax-four">
          <div className="caption-container">
            <span className="caption">
              a bite of divinity
            </span>   
          </div>
        </div>
        <section className="text-container">
          <h3>Tasting menu</h3>
          <div className="menu-courses-container">
            <div className="ingress">Osteria Italia is both fast and slow: a contemporary and traditional kitchen at the same time. This tasting menu changes according to our latest kitchen research.</div>
            <div className="menu-courses-container">
              {testingMenuItems}
            </div> 
          </div>  
        </section>
        <div className="parallax-five"></div>
        <section className="text-container">
          <h3>a la carte</h3>
          <div className="menu-courses-container">
            {menuCourses}
          </div>  
        </section>
        <div className="parallax-six"></div>
        <section className="text-container">
          <Link to={'/booking'} className="nav-link">
            <button className="primary-btn">reservations</button>
          </Link>
        </section>
        
     </div>
      
    	)
    }
	}
export default Menu;
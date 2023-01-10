import logo from '@/assets/images/logo.png';
import { ReactNode, useEffect } from 'react';
import $ from 'jquery';

type TPathNavbar = {
  path: string;
  name: string;
};

interface IProps {
  paths?: TPathNavbar[];
  renderNavItem?: (nav: TPathNavbar) => ReactNode;
}

export const Navbar = ({ paths, renderNavItem }: IProps) => {
  useEffect(() => {
    const $menu = $('.menu-sticky');
    if ($menu) {
      const ltTop = $menu?.offset()?.top || 0;

      $(window).on('scroll', function () {
        const window_top = $(window).scrollTop() || 0;
        if (window_top > ltTop) {
          if (!$menu.is('.fixed-top animated fadeInDown')) {
            $menu.addClass('fixed-top animated fadeInDown');
          }
        } else {
          $menu.removeClass('fixed-top animated fadeInDown');
        }
      });
    }
  }, []);

  return (
    <div className="tl-menu menu-absolute menu-sticky">
      <nav className="navbar navbar-expand-lg p-0">
        <div className="container">
          <a className="navbar-brand" href="../../../index.html">
            <img src={logo} alt="Logo here" className="img-fluid" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fa fa-align-justify" />
            </span>
          </button>
          {paths?.length && (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {paths.map((nav) => {
                  if (renderNavItem) {
                    return renderNavItem(nav);
                  }
                  return;
                })}
                {/* <li className="tl-dropdown"> */}
                {/*   <a href="@/component/Layout/Header#">home</a> */}
                {/*   <ul className="tl-dropdown-menu"> */}
                {/*     <li> */}
                {/*       <a href="../../../index.html">home V-1</a> */}
                {/*     </li> */}
                {/*     <li> */}
                {/*       <a href="index1.html">home V-2</a> */}
                {/*     </li> */}
                {/*     <li> */}
                {/*       <a href="dashboard.html">home Dashboard</a> */}
                {/*     </li> */}
                {/*   </ul> */}
                {/* </li> */}
                {/* <li> */}
                {/*   <a href="about.html">About</a> */}
                {/* </li> */}
                {/* <li> */}
                {/*   <a href="property.html">Properties</a> */}
                {/* </li> */}
                {/* <li className="tl-dropdown active"> */}
                {/*   <a href="@/component/Layout/Header#">Pages</a> */}
                {/*   <ul className="tl-dropdown-menu"> */}
                {/*     <li> */}
                {/*       <a href="team.html">Agents</a> */}
                {/*     </li> */}
                {/*     <li> */}
                {/*       <a href="blog-list.html">Blog List View</a> */}
                {/*     </li> */}
                {/*     <li> */}
                {/*       <a href="blog.html">Blog Grid View</a> */}
                {/*     </li> */}
                {/*     <li> */}
                {/*       <a href="blog-details.html">Blog Details</a> */}
                {/*     </li> */}
                {/*     <li> */}
                {/*       <a href="agent-details.html">Agent Details</a> */}
                {/*     </li> */}
                {/*     <li> */}
                {/*       <a href="property-submit.html">Property Submit</a> */}
                {/*     </li> */}
                {/*     <li> */}
                {/*       <a href="property-details.html">Property Details</a> */}
                {/*     </li> */}
                {/*     <li className="active"> */}
                {/*       <a href="login.html">Login</a> */}
                {/*     </li> */}
                {/*     <li> */}
                {/*       <a href="sign-up.html">Sign Up</a> */}
                {/*     </li> */}
                {/*   </ul> */}
                {/* </li> */}
                {/* <li> */}
                {/*   <a href="blog.html">Blog</a> */}
                {/* </li> */}
                {/* <li> */}
                {/*   <a href="contact.html">Contact</a> */}
                {/* </li> */}
              </ul>
            </div>
          )}
          {/* <div className="right-content"> */}
          {/*   <div className="tl-search"> */}
          {/*     <div className="search-icon"> */}
          {/*       <i className="fa fa-search" aria-hidden="true" /> */}
          {/*     </div> */}
          {/*     <div className="search-form text-center open-search"> */}
          {/*       <div className="close-search"> */}
          {/*         <span> */}
          {/*           <i className="fa fa-times-circle" aria-hidden="true" /> */}
          {/*         </span> */}
          {/*       </div> */}
          {/*       <form action="@/component/Layout/Header#" id="search" method="get"> */}
          {/*         <input id="inputhead" name="search" type="text" placeholder="Enter keyword..." /> */}
          {/*         <button type="submit"> */}
          {/*           <i className="fa fa-search" aria-hidden="true" /> */}
          {/*         </button> */}
          {/*       </form> */}
          {/*       /!* /form *!/ */}
          {/*     </div> */}
          {/*     /!* /s form *!/ */}
          {/*   </div> */}
          {/*   /!* /.tl-search *!/ */}
          {/*   <div className="lt-button"> */}
          {/*     <a href="property-submit.html" className="btn btn-transparent"> */}
          {/*       Submit Property */}
          {/*     </a> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
        {/* /.container */}
      </nav>
      {/* /.navbar */}
    </div>
  );
};

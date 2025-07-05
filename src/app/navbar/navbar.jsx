import ASLogo from "../photos/AS-CIRCLE-LOGO.png";

function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={ASLogo} alt="Austin's Logo"></img>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/achievements">
                  Achievements
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Coding Projects
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/codingprojects/#8ball">
                      Magic 8 Ball
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/codingprojects/#rpsconsole"
                    >
                      RPS Game
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/codingprojects/#calculator"
                    >
                      Calculator
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/codingprojects/#coinflip"
                    >
                      Coin Flip
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/codingprojects/#tempconverter"
                    >
                      Temperature Converter
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/codingprojects/#chatbot"
                    >
                      ChatGPT Telegram Bot
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/codingprojects/#rps">
                      Rock Paper Scissors
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/codingprojects/#stopwatch"
                    >
                      Stopwatch
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/codingprojects/#ttt">
                      Tic Tac Toe
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/codingprojects/#tdl">
                      To-Do List
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/codingprojects">
                      <b>View All</b>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Design Projects
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="/designprojects/#lawksmini"
                    >
                      The LAWKS Mini
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/designprojects/#freskoapp"
                    >
                      Fresko App
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/designprojects/#spapp">
                      Singapore Polytechnic App
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/designprojects/#hiddengems"
                    >
                      Hidden Gems App
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/designprojects/#graphicdesigns"
                    >
                      Graphic Designs
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/designprojects/#figmadesigns"
                    >
                      Figma Designs
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/designprojects">
                      <b>View All</b>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/participation">
                  Events
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

describe('land in home page', () => {
  it('visit the page', () => {
    cy.visit('/');
    cy.wait(3000)
  })

  it('check if home page has hader', ()=>{
    cy.visit('/')
    cy.get("#iconheader").contains('Telessist')
    cy.wait(3000)
  })

  it('check if home page has footer', ()=>{
    cy.visit('/')
    cy.get('#subscribe').contains('Subscribe to our newsletter')
    cy.wait(3000)
  })

  it('check if home page has login button', ()=>{
    cy.visit('/')
    cy.get('.loginbutton').contains('Login')
    cy.wait(3000)
  })

  it('check if home page has register button', ()=>{
    cy.visit('/')
    cy.get('.registerbutton').contains('Register')
    cy.wait(3000)
  })

  it('should access to login page', ()=>{
    cy.visit('/')
    cy.get('.loginbutton').click()
    cy.wait(3000)
    cy.url().should('include', 'login')
  })

  it('should access to register page', ()=>{
    cy.visit('/')
    cy.get('.registerbutton').click()
    cy.wait(3000)
    cy.url().should('include', 'register')
  })
})

describe('land in login page', ()=>{
  it('visit the page', ()=>{
    cy.visit('/login');
    cy.wait(3000)
  })

  it('check if login page has title', ()=>{
    cy.visit('/login')
    cy.get('#logintitle').contains('Login')
  })

})

describe('land in register page', ()=>{
  it('visit the page', ()=>{
    cy.visit('/register');
    cy.wait(3000)
  })

  it('check if register page has title', ()=>{
    cy.visit('/register')
    cy.get('#registertitle').contains('Register')
  })

})


describe('admin login process testing', ()=>{
  it('admin login credential check', ()=>{
    cy.visit('/login')
    cy.get('mat-select[formControlName=userType]').click().get('mat-option').contains('Manager').click()
    cy.get('#username').click({force:true}).type('admin')
    cy.get('#password').click({force:true}).type('admin')
    cy.wait(3000)
    cy.get('.btnlogin').click()
    cy.wait(3000)
    cy.url().should('include', 'admindash/admindashboard')
  })
})

describe('client login process testing', () => {
  it('client login credential check', ()=>{
    cy.visit('/login')
    cy.get('mat-select[formControlName=userType]').click().get('mat-option').contains('Client').click()
    cy.get('#username').click({force:true}).type('Test')
    cy.get('#password').click({force:true}).type('test')
    cy.wait(3000)
    cy.get('.btnlogin').click()
    cy.wait(3000)
    cy.url().should('include', 'clientdash')
  })

})

describe('agent login process testing', () => {
  it('agent login credential check', ()=>{
    cy.visit('/login')
    cy.get('mat-select[formControlName=userType]').click().get('mat-option').contains('Agent').click()
    cy.get('#username').click({force:true}).type('Shell')
    cy.get('#password').click({force:true}).type('shell')
    cy.wait(3000)
    cy.get('.btnlogin').click()
    cy.wait(3000)
    cy.url().should('include', 'agentdash')
  })
})


describe('register process testing', ()=>{
  it('client can register and login', ()=>{
    cy.visit('/register')
    cy.get('#username').click({force:true}).type('client5')
    cy.get('#password').click({force:true}).type('password')
    cy.get('#confimPass').click({force:true}).type('password')
    cy.get('#phone-number').click({force:true}).type('123-456-789')
    cy.get('#firstname').click({force:true}).type('client')
    cy.get('#lastname').click({force:true}).type('client')
    cy.get('#streetAddress').click({force:true}).type('123 client street')
    cy.get('#city').click({force:true}).type('Toronto')
    cy.get('mat-select[formControlName=province]').click().get('mat-option').contains('Ontario').click()
    cy.get('#postalCode').click({force:true}).type('L8U 1U8')
    cy.wait(3000)
    cy.get('.btnlogin').click()
    cy.wait(3000)
    cy.url().should('include', 'login')
    cy.get('mat-select[formControlName=userType]').click().get('mat-option').contains('Client').click()
    cy.get('#username').click({force:true}).type('client5')
    cy.get('#password').click({force:true}).type('password')
    cy.wait(3000)
    cy.get('.btnlogin').click()
    cy.wait(3000)
    cy.url().should('include', 'clientdash')
  })
})

describe('dashboard check for admin', ()=>{
  beforeEach(()=>{
    const login = (username:any) => {
        cy.session(username, () => {
            cy.request({
                method:'Post', 
                url:'http://localhost:8001/api/Admins/admin_login', 
                body:{username, password: "admin","name":""},
            }).then(({body}) => {
                window.sessionStorage.setItem("mytoken", body.token);
                window.sessionStorage.setItem("isAdmin", "true");
            })
        })
      }
    login('admin'); 
    cy.wait(3000)
  })

  it('has greeting in profile', ()=>{
    cy.visit('/admindash/admindashboard');
    cy.get('#greeting').contains("Hello Manager!");
    cy.wait(3000);
  })

  it('csr management page', () =>{
    cy.visit('/admindash/admindashboard');
    cy.get('#navBtn').click({force:true});
    cy.get('.agentman').click({force:true});
    cy.get('#agentHead').contains('Manage Agents');
    cy.wait(3000);
  })

  it('logout', () => {
    cy.visit('/admindash/admindashboard');
    cy.get("#logoutBtn").click({force:true});
    cy.wait(3000);
    cy.get("#iconheader").contains('Telessist')
  })
})

describe('dashboard check for agent', ()=>{
  beforeEach(()=>{
    const login = (username:any) => {
        cy.session(username, () => {
            cy.request({
                method:'Post', 
                url:'http://localhost:8001/api/CSRAgents/login', 
                body:{ id: 3, firstname: "", lastname: "",username, password: "shell","name":""},
            }).then(({body}) => {
                window.sessionStorage.setItem("mytoken", body.token);
                window.sessionStorage.setItem("isAgent", "true");
            })
        })
      }
    login('Shell'); 
    cy.wait(3000)
  })

  it('has greeting in profile', ()=>{
    cy.visit('/agentdash/agentdashboard');
    cy.get('#welcome').contains("Welcome to Telessist");
    cy.wait(3000);
  })

  it('clientlist page', () =>{
    cy.visit('/agentdash/agentdashboard');
    cy.get('#navBtn').click({force:true});
    cy.get('.clientList').click({force:true});
    cy.get('#clientHeader').contains('Client List');
    cy.wait(3000);
  })

  it('logout', () => {
    cy.visit('/agentdash/agentdashboard');
    cy.get("#logoutBtn").click({force:true});
    cy.wait(3000);
    cy.get("#iconheader").contains('Telessist')
  })
})

describe('dashboard check for client', ()=>{
  beforeEach(()=>{
    const login = (username:any) => {
        cy.session(username, () => {
            cy.request({
                method:'Post', 
                url:'http://localhost:8001/api/AuthUsers/login', 
                body:{ id: 11, firstName: "",lastName: "",email: "", username, password: "password"},
            }).then(({body}) => {
                window.sessionStorage.setItem("mytoken", body.token);
                window.sessionStorage.setItem("isClient", "true");
            })
        })
      }
    login('client3'); 
    cy.wait(3000)
  })

  it('has profile', ()=>{
    cy.visit('/clientdash/clientdashboard');
    cy.get('#profile').click({force:true});
    cy.get("#profileHead").contains("Profile")
    cy.wait(3000);
  })

  it('service Request', () =>{
    cy.visit('/clientdash/clientdashboard');
    cy.get('#navBtn').click({force:true});
    cy.get('.serviceRequest').click({force:true});
    cy.get('#serviceHead').contains('Service Request Form');
    cy.wait(3000);
  })

  it('logout', () => {
    cy.visit('/clientdash/clientdashboard');
    cy.get("#logoutBtn").click({force:true});
    cy.wait(3000);
    cy.get("#iconheader").contains('Telessist')
  })
})
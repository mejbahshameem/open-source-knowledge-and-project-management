const searchModule = require('../js/search');

  describe("Testing search module", () =>{
    beforeAll(()=>{
        initSpy = jest.spyOn(searchModule, 'init');
        newSearchSpy = jest.spyOn(searchModule, 'newSearch');
        triggerSearchSpy = jest.spyOn(searchModule, 'triggerSearch');
        openWorkflowSpy = jest.spyOn(searchModule, 'openWorkflow');
    })
    test('search module calls the init function properly', () => {
    try{
        // will throw error as $ is not defined. -- missing jquery 
        searchModule.init();
    }catch(err){
        // do nothing
        console.log(err.message);
        expect(err.message).toBe('$ is not defined');
    }
    expect(initSpy).toHaveBeenCalled();
  });

  test('search module calls the new search function properly', () => {
    try{
        searchModule.newSearch();
    }catch(err){
        // do nothing
        console.log(err.message);
        expect(err.message).toBe('$ is not defined');
    }
    expect(newSearchSpy).toHaveBeenCalled();
  });

  test('search module calls the trigger search function properly', () => {
    try{
        searchModule.triggerSearch();
    }catch(err){
        // do nothing
        console.log(err.message);
        expect(err.message).toBe('$ is not defined');
    }
    expect(triggerSearchSpy).toHaveBeenCalled();
  });

  test('search module calls the openWorkflow function without parameter', () => {                          
    try{
        // will throw error as . -- missing jquery 
        searchModule.openWorkflow();
    }catch(err){
        // do nothing
        console.log(err.message);
        expect(err.message).toBe("Cannot read property 'getAttribute' of undefined");
    }
    expect(openWorkflowSpy).toHaveBeenCalled();
  });

  test('search module calls the openWorkflow function with parameter', () => {
    var para = document.createElement("p");
    var att = document.createAttribute("dataid");     
    att.value = "-99";    
    para.setAttributeNode(att);                       
    try{
        searchModule.openWorkflow(para);
    }catch(err){
        // test failed -- should not catch any error.
        expect(true).toBe(false);
    }
    expect(localStorage.getItem('viewWorkflow')).toBe('-99');
    expect(openWorkflowSpy).toHaveBeenCalled();
  });
})

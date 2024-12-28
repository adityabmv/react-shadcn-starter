# Workflow
1. User Logs In
2. State is updated with login details.
3. On successfull login, request sent to server via sdk to fetch enrolled courses of the user.
4. State is updated with enrolled courses.
5. On successfull retreival of enrolled courses, the course having the status in-progress is stored as current course in state.
6. Using the current course details, list of all modules is fetched from the server via sdk, and stored in state.
7. The module with status inprogress is set as current module in state.
8. Similarly, sections of current module are fetched and current section is defined in state.
9. Similarly, section items of current section are fetched and current section item is defined in state.
10. If section item type is Assessment then assessment is fetched and stored in state, same for other item types.



### **Section Item Status Logic**
1. **Set `INPROGRESS`:**
   - Must be the first item in the section.
   - OR, the previous item in the section must have a status of `COMPLETE`.

---

### **Section Status Logic**
1. **Set `INPROGRESS`:**
   - All previous sections in the module must be `COMPLETE`.
2. **Set `COMPLETE`:**
   - All section items in the section must be `COMPLETE`.
   - All preceding sections in the module must also be `COMPLETE`.

---

### **Module Status Logic**
1. **Set `INPROGRESS`:**
   - Follows the same logic as the section status (depends on the progress of preceding modules).
2. **Set `COMPLETE`:**
   - All sections in the module must be `COMPLETE`.

---

### **Course Status Logic**
1. **Set `INPROGRESS`:**
   - Follows similar dependency logic as modules and sections.
2. **Set `COMPLETE`:**
   - All modules in the course must be `COMPLETE`.

---

### **Backend Checks**
1. **Default Statuses:**
   - Every **course**, **module**, **section**, and **section item** starts with the status `INCOMPLETE`.
   - Exceptions for a **NEW student**:
     - The first module of the course.
     - The first section of the first module.
     - The first section item of the first section — all set to `INPROGRESS`.

2. **Update Process:**
   - Status updates are made **server-side** first.
   - After the server update, the **application state** (client-side) is updated locally.
   - No repeated API calls are made for the same state change.


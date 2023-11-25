# handles get request

http://localhost:3000/api/v1/students

# filtering

http://localhost:8000/api/v1/students?Status=Admission&selectedCourse=MS-CIT&page=3

# advance filtering

http://localhost:8000/api/v1/students?discount[gt]=1000

http://localhost:8000/api/v1/students?discount[lt]=2000

# sorting

http://localhost:8000/api/v1/students?sort=TotalFees,discount

# limiting fields

http://localhost:8000/api/v1/students?fields=selectedCourse,discount,TotalFees,mobileNo
it gives excluding all other fields

http://localhost:8000/api/v1/students?fields=-discount,-TotalFees
it gives excluding discount and TotalFees

# pagination

http://localhost:8000/api/v1/students?page=1&limit=2

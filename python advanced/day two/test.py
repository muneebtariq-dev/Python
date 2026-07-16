class A:
    def process(self):
        print("A")

class B(A):
    pass

class C(A):
    pass

class D(B, C):
    pass

D().process()
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

# will need a relationship and table name for the user object in the favorites model

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False,unique=False)
    age: Mapped[int] = mapped_column(nullable=False, unique= False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "age": self.age
            # do not serialize the password, its a security breach
        }


class Favorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    # user:
    show = relationship("Show",backref="favorites")

  

    def serialize(self):
        return {
            "id": self.id,
            "show": [item.showTitle for item in self.show] 
         }
    

class Show(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    showTitle: Mapped[str] = mapped_column(String(50), unique=False, nullable=True)
    favoriteId: Mapped[int] = mapped_column(ForeignKey("favorites.id"))

    def serialize(self):
        return {
            "id": self.id,
            "showTitle": self.showTitle,
            "favoriteId": self.favoriteId,
            }
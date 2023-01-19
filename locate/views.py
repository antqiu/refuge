from django.shortcuts import render

# Create your views here.
import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import ListView
from .models import *
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import F


@csrf_exempt
def index(request):
    return render(request, 'locate/index.html')


def near(request):
    return render(request, 'locate/near.html')


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "locate/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "locate/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "locate/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "locate/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "locate/register.html")


def restrooms(request):
    return render(request, "locate/restrooms.html")

# this is going to be the individual restroom


def restrooms_id(request, restroom_id):
    # going  to have to managep ost request  later,  have to append comments to  the   database
    #restroom = Restroom.objects.get(pk=restroom_id)
    if request.method == "GET":
        name = request.GET['restroom'].title()
        latitude = request.GET['latitude']
        longitude = request.GET['longitude']
        comments = Comment.objects.filter(refuge_id=restroom_id)
        print(comments)
        return render(request, "locate/restroom.html", {
            # "restroom": restroom
            "restroom_id":  restroom_id,
            "restroom_name": name,
            "latitude": latitude,
            "longitude": longitude,
            "comments": comments,
        })
    if request.method == 'POST':
        # get the data from the form
        content = request.POST['comment']
        # create a new comment object
        next = request.POST.get('next', '/')
        new_comment = Comment(
            content=content,
            refuge_id=restroom_id,
            user=request.user
        )
        # save the comment
        new_comment.save()
        return HttpResponseRedirect(next)
    return render(request, "locate/restroom.html", {
        # "restroom": restroom
        "restroom_id":  restroom_id,
    })
